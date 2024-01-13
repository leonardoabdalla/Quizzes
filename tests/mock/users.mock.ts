import { GetAllUsers } from "../../src/interfaces/getAllUsers"

export class GetUsers {
    static getAll(_getAll: any) {
        throw new Error("Method not implemented.")
    }
    getAll: GetAllUsers[] = [
        {
            "id": "659351f98dc1e5a574618368",
            "type": "ADMIN",
            "name": "Leonardo Abdalla",
            "email": "leonardoabdalladeveloper@gmail.com",
            "status": true
        },
        {
            "id": "659352b50a38a3091fe527d3",
            "type": "REGULAR",
            "name": "teste",
            "email": "teste@teste.com",
            "status": true
        },
        {
            "id": "65980ec4f305ab3018247e33",
            "type": "GUEST",
            "name": "teste3",
            "email": "teste@teste3.com",
            "status": true
        }
    ]

    getByUser = {
        "type": "REGULAR",
        "id": "659352b50a38a3091fe527d3",
        "name": "teste",
        "email": "teste@teste.com",
        "status": true,
        "subscriptions": [
            "TESTE2"
        ]
    }
}