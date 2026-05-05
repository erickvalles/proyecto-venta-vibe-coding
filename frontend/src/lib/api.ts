const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = {
  async get(endpoint: string, token?: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    return res.json()
  },

  async post(endpoint: string, data: any, token?: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async put(endpoint: string, data: any, token?: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  async delete(endpoint: string, token?: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    return res.json()
  }
}