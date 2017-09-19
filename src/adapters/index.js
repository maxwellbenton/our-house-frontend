const baseUrl = 'https://our-house-backend.herokuapp.com'

export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }
  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
        headers: headers(),
    }).then(res => res.json() )
  }  
}

export class OurHouseAdapter  {
  static all(){
    return fetch(`${baseUrl}/house_images`, {
      headers: headers()
    })
      .then( res => res.json() )
  }

  static create(newPhoto, section){
    return fetch(`${baseUrl}/house_images`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        image: {
            url: newPhoto.url,
            section: section,
            score: 1
        }
      })
    }).then(response => response.json() )
    
  }
  static delete(photo_id){
    return fetch(`${baseUrl}/images/${photo_id}`, {
      method: 'DELETE',
      headers: headers()
    }) 
  }
  static update(photo){
    return fetch(`${baseUrl}/images/${photo.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        image: {
            id: photo.id,
            action: photo.action
        }
      })
    }).then(response => response.json() )
    
  }
}

function headers() {
    return {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
}