export type geoType = {
    lat: string;
    lng: string;
}
export type addressType = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: geoType;
}
export type companyType = {
    name: string;
    catchPhrase: string;
    bs: string;
}
export type DataType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: addressType;
    phone: string;
    website: string;
    company: companyType;
}
export type UsersType = DataType[] | null;
export type ActionType = {type: 'LOADING'; data: UsersType} | {type: 'SUCCESS'; data: UsersType}
export type StateType = {loading: boolean; data: UsersType}