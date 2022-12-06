import { gql } from "@apollo/client";

const GET_REQUESTS = gql`
    query {
        requests {
            id
            requestStatus
            requestLastName
            requestName
            requestDate
            requestService
            account {
                accountProfileImage {
                    url
                }
                accountColor {
                    hex
                }
            }
        }
    }
`;

export { GET_REQUESTS };
