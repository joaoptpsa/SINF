class Address {
    detail;
    city;
    country;
    postalCode;

    constructor(XMLElement){
        this.detail = XMLElement.AddressDetail[0];
        this.city = XMLElement.City[0];
        this.country = XMLElement.Country[0];
        this.postalCode = XMLElement.PostalCode[0];
    }
}

export default Address;