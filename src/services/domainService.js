import axios from "axios";

export const extractDomain = async (domain) => {

  const response = await axios.get(`https://rdap.org/domain/${domain}`);

  const data = response.data;
  const ldhname = data.ldhName || "";
  const registrarEntity = data.entities.find(entity => entity.roles.includes("registrar")) || null;
  const registrar = registrarEntity ? registrarEntity.vcardArray[1].find(item => item[0] === "fn")[3] : "";

  const outputDate = (eventAct) => {
    const event = data.events.find(event => event.eventAction === eventAct);
    return event ? event.eventDate : "";
  }
  
  const creationDate = outputDate("registration");
  const expirationDate = outputDate("expiration");
  const updatedDate = outputDate("last changed");

  const status = data.status || [];

  const nameservers = data.nameservers ? data.nameservers.map(ns => ns.ldhName) : [];

  const output = {
    domain: ldhname,
    registrar: registrar,
    registered_at: creationDate,
    expired_at: expirationDate,
    last_updated: updatedDate,
    status: status,
    nameservers: nameservers
  };

  return output;
};