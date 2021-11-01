export interface AddressModel {
    country?: string;
    zipCode?: string;
    region?: string;
    street?: string;
    house?: string;
    building?: string;
    floor?: string;
    flat?: string;
    city?: string;
}

export const newAddress: AddressModel = {
    country: '',
    zipCode: '',
    region: '',
    street: '',
    house: '',
    building: '',
    floor: '',
    flat: '',
    city: '',
}
