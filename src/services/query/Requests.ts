import { IAccount } from "../../models/account";

class RequestsQuery {
    // Fetch All Users
    readonly fetchUsers = () => {
        return JSON.stringify({
            query: `{
                requests {
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
                    account {
                        itemId
                        name
                        lastName
                        userName
                        isAdmin
                        color {
                            hex
                        }
                        profileImage {
                            url
                        }
                    }
                }
            }`,
        });
    };

    // Create User
    readonly createUser = (inputData: IAccount) => {
        return JSON.stringify({
            query: `
                mutation createUser(
                    $itemId: String!
                    $name: String!
                    $lastName: String!
                    $email: String!
                    $userName: String!
                    $password: String!
                    $isAdmin: Boolean!
                    $bio: String
                    $location: String
                    $itemRequests: Json
                    $answeredRequests: Json
                    $itemTickets: Json
                    $answeredTickets: Json
                    $color: ColorInput
                    $profileImage: AssetCreateOneInlineInput
                    $tickets: TicketCreateManyInlineInput
                    $requests: AccountRequestsCreateManyInlineInput
                    ) {
                    createRequest(
                        data:{
                            itemId: $itemId
                            name: $name
                            lastName: $lastName
                            email: $email
                            userName: $userName
                            password: $password
                            isAdmin: $isAdmin
                            bio: $bio
                            location: $location
                            itemRequests: $itemRequests
                            answeredRequests: $answeredRequests
                            itemTickets: $itemTickets
                            answeredTickets: $answeredTickets
                            color: $color
                            profileImage: $profileImage
                            tickets: $tickets
                            requests: $requests
                        }
                    ) 
                    {
                        id
                    }
                }
            `,
            variables: {
                itemId: inputData.itemId,
                name: inputData.name,
                lastName: inputData.lastName,
                email: inputData.email,
                userName: inputData.userName,
                password: inputData.password,
                isAdmin: inputData.isAdmin,
                bio: inputData.bio,
                location: inputData.location,
                answeredTickets: inputData.answeredTickets,
                answeredRequests: inputData.answeredRequests,
                itemTickets: inputData.itemTickets,
                itemRequests: inputData.itemRequests,
                createdAt: inputData.createdAt,
                color: inputData.color,
                profileImage: inputData.profileImage,
            },
        });
    };

    readonly pendRequestQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation {
                    updateRequest(data: {itemStatus: "pending"}, where: {itemId: "${itemId}"} ) {
                        id
                    }
                }
            `,
        });
    };

    readonly solveRequestQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    updateRequest(data: {itemStatus: "solved"}, where: {itemId: "${itemId}"} ) {
                        id
                    }
                }
            `,
        });
    };

    readonly reviewRequestQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
            mutation MyMutation {
                updateRequest(data: {itemStatus: "reviewing"}, where: {itemId: "${itemId}"} ) {
                    id
                }
            }
        `,
        });
    };

    readonly publishRequestQuery = (itemId: string) => {
        return JSON.stringify({
            query: `
                mutation MyMutation {
                    publishRequest(where: {itemId: "${itemId}"}) { id }
                }          
            `,
        });
    };
}

export default new RequestsQuery();
