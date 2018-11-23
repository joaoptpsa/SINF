class Address {
    constructor(XMLElement) {
        this.detail = XMLElement.AddressDetail[0];
        this.city = XMLElement.City[0];
        this.country = XMLElement.Country[0];
        this.postalCode = XMLElement.PostalCode[0];
        if (XMLElement.BuildingNumber) this.buildingNumber = XMLElement.BuildingNumber[0];
        if (XMLElement.StreetName) this.streetName = XMLElement.StreetName[0];
        if (XMLElement.Region) this.region = XMLElement.Region[0];
    }
}

export default Address;