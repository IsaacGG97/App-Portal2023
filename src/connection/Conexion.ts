import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export class getService {
  cliente: any;
  clave: string =
    "d5574e355d2a4610f64cc868eb5488cbbbac7e5c821f0bcf7c8d621048abedde37bb03b65595cfb7dc10480f5f6c283acfa5bb0fd8b5056117b008e1492f128188dbfc671e32269543308632bd9475e3cdc5812c033467a848a5d85afe294dec9304ba51cbf00b3e25913000857bf5f7679d246c7d699fb662a274cc1fbd5c48";

  constructor() {
    this.cliente = new ApolloClient({
      cache: new InMemoryCache({
        addTypename: false,
      }),
      link: new HttpLink({
        uri: "http://18.213.77.154:1337/graphql",
        headers: {
          authorization: this.clave ? `Bearer ${this.clave}` : "",
        },
      }),
    });
  }

  getConexion(): any {
    return this.cliente;
  }
}
