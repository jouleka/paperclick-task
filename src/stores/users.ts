import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserFormData } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getUsers = computed(() => users.value)
  const getUserById = computed(() => (id: number) => {
    return users.value.find((user: User) => user.id === id)
  })

  async function fetchUsers() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      users.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch users'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  async function createUser(userData: UserFormData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const createdUser = await response.json() as User
      users.value.push(createdUser)
      return createdUser
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create user'
      console.error(error.value)
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id: number, userData: UserFormData) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const updatedUser = await response.json() as User
      const index = users.value.findIndex((user: User) => user.id === id)

      if (index !== -1) {
        users.value[index] = updatedUser
      }

      return updatedUser
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update user'
      console.error(error.value)
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function deleteUser(id: number) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      users.value = users.value.filter((user: User) => user.id !== id)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete user'
      console.error(error.value)
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    getUsers,
    getUserById,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})
