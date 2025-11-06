import axios from "axios";

export const api = axios.create({
  baseURL: "https://veiculos-assistencia-a8gyakbscre7axg7.brazilsouth-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});