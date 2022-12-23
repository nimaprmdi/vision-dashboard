import { IEditAccount } from "../../models/account";

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
                    stafId
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
}
export default new AccountsQuery();
