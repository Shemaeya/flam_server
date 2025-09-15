import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const { isDefault, ...addressData } = createAddressDto;

    // If this is set as default, unset all other default addresses
    if (isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    // Check if this is the first address (auto-set as default)
    const existingAddressesCount = await this.prisma.address.count({
      where: { userId },
    });

    const address = await this.prisma.address.create({
      data: {
        ...addressData,
        userId,
        isDefault: isDefault || existingAddressesCount === 0,
        inServiceZone: await this.checkIfInServiceZone(
          addressData.latitude,
          addressData.longitude,
        ),
      },
    });

    return address;
  }

  async findAll(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string, userId: string) {
    const address = await this.prisma.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.findOne(id, userId);

    const { isDefault, ...updateData } = updateAddressDto;

    // If this is set as default, unset all other default addresses
    if (isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, id: { not: id } },
        data: { isDefault: false },
      });
    }

    // Check if coordinates changed and update service zone status
    let inServiceZone = address.inServiceZone;
    if (updateData.latitude !== undefined || updateData.longitude !== undefined) {
      inServiceZone = await this.checkIfInServiceZone(
        Number(updateData.latitude ?? address.latitude),
        Number(updateData.longitude ?? address.longitude),
      );
    }

    const updatedAddress = await this.prisma.address.update({
      where: { id },
      data: {
        ...updateData,
        inServiceZone,
      },
    });

    return updatedAddress;
  }

  async remove(id: string, userId: string) {
    const address = await this.findOne(id, userId);

    await this.prisma.address.delete({
      where: { id },
    });

    // If this was the default address, set another one as default
    if (address.isDefault) {
      const remainingAddresses = await this.prisma.address.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: 1,
      });

      if (remainingAddresses.length > 0) {
        await this.prisma.address.update({
          where: { id: remainingAddresses[0].id },
          data: { isDefault: true },
        });
      }
    }

    return { message: 'Address deleted successfully' };
  }

  async setDefault(id: string, userId: string) {
    const address = await this.findOne(id, userId);

    // Unset all other default addresses
    await this.prisma.address.updateMany({
      where: { userId, id: { not: id } },
      data: { isDefault: false },
    });

    // Set this address as default
    const updatedAddress = await this.prisma.address.update({
      where: { id },
      data: { isDefault: true },
    });

    return updatedAddress;
  }

  async checkServiceZone(latitude: number, longitude: number) {
    const inServiceZone = await this.checkIfInServiceZone(latitude, longitude);
    return { inServiceZone };
  }

  private async checkIfInServiceZone(
    latitude?: number | null,
    longitude?: number | null,
  ): Promise<boolean> {
    if (!latitude || !longitude) {
      return false;
    }

    // Get all active delivery zones
    const zones = await this.prisma.deliveryZone.findMany({
      where: { isActive: true },
    });

    // Simple point-in-polygon check (simplified for demo)
    // In production, you would use a proper geospatial library
    for (const zone of zones) {
      const coordinates = zone.polygonCoordinates as any;
      if (this.isPointInPolygon(latitude, longitude, coordinates)) {
        return true;
      }
    }

    return false;
  }

  private isPointInPolygon(
    lat: number,
    lng: number,
    polygon: number[][],
  ): boolean {
    // Simple ray casting algorithm for point-in-polygon
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      if (((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  }
}
