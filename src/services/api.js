
const API_URL = "https://gubackend.onrender.com/"
const cloudName = 'dahfv3llv'
const unsignedUploadPreset = 'wcqeluyf'

export const get = async (endpoint) => {
    try {
      // const sc = localStorage.getItem('sc')
      // console.log(endpoint);
      const response = await fetch(API_URL+endpoint, {
        // headers: {
        //   // Authorization: sc,
        // },
      })
      const result = await response.json()
      // console.log(result);
      return result
    } catch (error) {
      console.error(error)
    } 
  }

  export const post = async (endpoint,data) => {
    try {
      if (!data) {
        throw new Error('Aucune donnée fournie')
      }
    //   const sc = localStorage.getItem('sc')
     // console.log(sc);
     const response = await fetch(API_URL+endpoint, {
      method: 'POST',
        headers: {
          Accept: 'application/json',
        //   Authorization: sc,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
 
      if (response.status === 200) {
        const result = await response.json()
        return result
      } else {
        throw new Error(`Erreur! statut: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  export const postSend = async (endpoint) => {
    try {
      // if (!data) {
      //   throw new Error('Aucune donnée fournie')
      // }
      const sc = localStorage.getItem('sc')
     // console.log(sc);
     const response = await fetch(API_URL+endpoint, {
      method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: sc,
          'Content-Type': 'application/json',
        }
      })
 
      if (response.status === 200) {
        const result = await response.json()
        return result
      } else {
        throw new Error(`Erreur! statut: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  export const put = async (endpoint,data,id) => {
    try {
      if (!data) {
        throw new Error('Aucune donnée fournie')
      }
      const sc = localStorage.getItem('sc')
      const response = await fetch(
        API_URL+id,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: sc,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )    
      if (response.status === 200) {
        const result = await response.json()
        return result
      } else {
        throw new Error(`Erreur! statut: ${response.status}`)
      }
    } catch (err) {
      console.error(err)
    }
  }


  export const postImage = async (fileInput,folder) => {
    if (!fileInput) return


    const formData = new FormData()
    formData.append('file', fileInput)
    formData.append('upload_preset', unsignedUploadPreset)
    formData.append('folder', folder)
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })
  
    const data = await response.json()
  
    return data.secure_url
  }


  export const postImages = async (selectedImages,folder) => {

  
    try {
      const newUploadedUrls = []
      for (const image of selectedImages) {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', unsignedUploadPreset)
        formData.append('folder',folder)
  
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        })
  
        const data = await response.json()
  
        if (data.secure_url) {
          newUploadedUrls.push(data.secure_url)
        }
  
        return newUploadedUrls
      }
    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }