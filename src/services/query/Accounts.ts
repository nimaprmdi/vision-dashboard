import { IEditAccount, IAccount, IAddAccount, IAccountLogin } from "../../models/account";

class AccountsQuery {
    readonly fetchAccountsQuery = () => {
        return JSON.stringify({
            query: `{
              accounts {
                id
                name
                lastName
                userName
                email
                itemId
                isAdmin
                createdAt
                bio
                answeredTickets
                answeredRequests
                password
                location {latitude , longitude}
                color {
                  hex
                }
                profileImage {
                  url
                }
                tickets {
                  userId
                  itemId
                  isPending
                  isClose
                  id
                  hasReply
                  description
                  date
                  subject
                  responses
                }
                requests {
                  ... on Request {
                    id
                    itemId
                    itemStatus
                    lastName
                    location
                    mobile
                    name
                    phone
                    service
                    date
                    gender
                    address
                    description
                    location
                  }
                }
              }
            }`,
        });
    };

    readonly publishAccountQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
              mutation MyMutation {
                  publishAccount(where: {itemId: "${itemId}"}) {
                      id
                  }
              }
            `,
        });
    };

    readonly updateAccountImageQuery = (imageId: string, itemId: string) => {
        return JSON.stringify({
            query: `
              mutation {
                  updateAccount(data: {profileImage: {connect: {id: "${imageId}"}}}, where: {itemId: "${itemId}"}) {
                      id
                  }
              }
            `,
        });
    };

    readonly updateAccountQuery = (itemId: string, data: IEditAccount) => {
        return JSON.stringify({
            query: `
                  mutation updateAccount(
                      $bio: String,
                      $color: Hex,
                      $email: String,
                      $name: String,
                      $lastName: String,
                      $password: String,
                      $latitude: Float!,
                      $longitude: Float!,
                    ) {
                      updateAccount(
                        data: {
                          bio: $bio,
                          color: {hex: $color},
                          email: $email,
                          name: $name,
                          lastName: $lastName,
                          password: $password,
                          location : {latitude: $latitude, longitude: $longitude}
                        },
                        where: {itemId: "${itemId}"}
                        ) { 
                          id
                      }
                  }
            `,
            variables: {
                bio: data.bio,
                color: data.color,
                email: data.email,
                name: data.name,
                lastName: data.lastName,
                password: data.password,
                latitude: data.location?.latitude,
                longitude: data.location?.longitude,
            },
        });
    };

    readonly updateAccountPermission = (itemId: string, permission: boolean) => {
        return JSON.stringify({
            query: `
              mutation updateAccount {
                updateAccount(where: {itemId: "${itemId}"}, data: {isAdmin: ${permission}}) { 
                  itemId
                }
              }`,
        });
    };

    readonly deleteAccountQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
              mutation MyMutation2 {
                deleteAccount(where: {itemId: "${itemId}"}) {
                  itemId
                }
              }`,
        });
    };

    readonly createAccountQuery = (data: IAddAccount) => {
        return JSON.stringify({
            query: `
              mutation createAccount(
                $itemId: String!,
                $name: String!, 
                $lastName: String!,
                $email: String!,
                $userName: String!,
                $password: String!,
                $isAdmin: Boolean!
              ) {
              createAccount(
                data: {
                  itemId: $itemId,
                  name: $name,
                  lastName: $lastName,
                  email: $email,
                  userName: $userName,
                  password: $password,
                  isAdmin: $isAdmin
                }
              ) {
                itemId,
                name,
                lastName,
                email,
                userName,
                password,
                isAdmin,
                bio,
                location {latitude , longitude},
                answeredTickets,
                answeredRequests,
                tickets {
                  userId
                  itemId
                  isPending
                  isClose
                  id
                  hasReply
                  description
                  date
                  subject
                  responses
                }
                itemTickets,
                requests {
                  ... on Request {
                      id
                      itemId
                      itemStatus
                      lastName
                      location
                      mobile
                      name
                      phone
                      service
                      date
                      gender
                      address
                      description
                      location
                  }
                }
                itemRequests,
                color {
                    hex
                },
                profileImage {
                    url
                }
              }
            }`,
            variables: {
                itemId: data.itemId,
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                userName: data.userName,
                password: data.password,
                isAdmin: false,
            },
        });
    };

    readonly createGithubAccountQuery = (data: IAddAccount) => {
        return JSON.stringify({
            query: `
              mutation createAccount (
                $itemId: String!,
                $name: String!, 
                $lastName: String!,
                $userName: String!,
                $isAdmin: Boolean!
              ) {
              createAccount(
                data: {
                  itemId: $itemId,
                  name: $name,
                  lastName: $lastName,
                  userName: $userName,
                  isAdmin: $isAdmin
                }
              ) {
                itemId,
                name,
                lastName,
                email,
                userName,
                isAdmin,
                bio,
                location { latitude , longitude },
                answeredTickets,
                answeredRequests,
                tickets {
                  userId
                  itemId
                  isPending
                  isClose
                  id
                  hasReply
                  description
                  date
                  subject
                  responses
                }
                itemTickets,
                requests {
                  ... on Request {
                      id
                      itemId
                      itemStatus
                      lastName
                      location
                      mobile
                      name
                      phone
                      service
                      date
                      gender
                      address
                      description
                      location
                  }
                }
                itemRequests,
                color {
                    hex
                },
                profileImage {
                    url
                }
              }
            }`,
            variables: {
                itemId: data.itemId,
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                userName: data.userName,
                password: data.password,
                isAdmin: false,
            },
        });
    };

    readonly loginAccountQuery = (data: IAccountLogin) => {
        return JSON.stringify({
            query: `
              query ($email: String!, $password: String!) {
                accountsConnection(where: {email: $email, password: $password }) {
                  edges {
                    node {
                      itemId
                    }
                  } 
              }
            }`,
            variables: {
                email: data.email,
                password: data.password,
            },
        });
    };
}
export default new AccountsQuery();
