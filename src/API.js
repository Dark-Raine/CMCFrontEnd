export default class API{
    static signin(user, type){
        return fetch(`http://localhost:3000/${type}/login`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

    static createUser(user, type){
        return fetch(`http://localhost:3000/${type}/register`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }

    static validate(type){
        return this.get(`http://localhost:3000/${type}/authenticate`)
    }

    static getCollection(type){
        return this.get(`http://localhost:3000/${type}/mydata`)
    }

    static get(url){
        return fetch(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(resp => resp.json())
    }
}

window.API = API
