import axios from "axios";

export const api = axios.create({
  //baseURL: "https://veiculos-assistencia-a8gyakbscre7axg7.brazilsouth-01.azurewebsites.net/api",
  baseURL: "https://veiculos-assistencia2-gmbdgtgrafb4bbfd.brazilsouth-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});
