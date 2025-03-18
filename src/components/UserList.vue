<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/user'
import UserModal from '@/components/UserModal.vue'

const usersStore = useUsersStore()
const isModalOpen = ref(false)
const selectedUser = ref<User | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  try {
    await usersStore.fetchUsers()
  } catch (err) {
    console.error('Failed to load users:', err)
  } finally {
    isLoading.value = false
  }
})

function openCreateUserModal() {
  selectedUser.value = null
  isModalOpen.value = true
}

function openEditUserModal(user: User) {
  selectedUser.value = user
  isModalOpen.value = true
}

async function deleteUser(userId: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    isLoading.value = true
    try {
      await usersStore.deleteUser(userId)
    } catch (err) {
      console.error('Failed to delete user:', err)
    } finally {
      isLoading.value = false
    }
  }
}

function closeModal() {
  isModalOpen.value = false
  selectedUser.value = null
}
</script>

<template>
  <div class="user-list-container">
    <div class="user-list-header">
      <h1>Users</h1>
      <button class="create-button" @click="openCreateUserModal">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3.33334V12.6667M3.33334 8H12.6667"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Create User
      </button>
    </div>

    <div v-if="isLoading" class="loading">Loading users...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="usersStore.users.length === 0" class="empty-state">
      No users found. Click "Create User" to add a new user.
    </div>
    <div v-else class="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersStore.users" :key="user.id">
            <td data-label="ID">{{ user.id }}</td>
            <td data-label="Name">{{ user.name }}</td>
            <td data-label="Email">{{ user.email }}</td>
            <td data-label="Phone">{{ user.phone }}</td>
            <td class="actions" data-label="Actions">
              <button class="edit-button" @click="openEditUserModal(user)">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.0164 5L12.2281 3.78832L12.2281 3.78829L12.2282 3.78821C12.3439 3.67249 12.4018 3.61461 12.4473 3.56237C13.1023 2.80963 13.1023 1.68918 12.4473 0.936442C12.4018 0.884183 12.3439 0.82629 12.2281 0.71051L12.2281 0.710488C12.1123 0.594694 12.0544 0.536797 12.0021 0.491314C11.2494 -0.163771 10.129 -0.163771 9.37621 0.491314C9.32397 0.536781 9.26609 0.594655 9.15038 0.710369L9.1503 0.71044L9.15026 0.710489L7.92064 1.94011C8.65346 3.2168 9.72226 4.27733 11.0164 5ZM6.46596 3.39479L1.5426 8.31814C1.11754 8.7432 0.905011 8.95573 0.765276 9.21683C0.625541 9.47793 0.566596 9.77265 0.448706 10.3621L0.0638519 12.2864C-0.00267026 12.619 -0.0359313 12.7853 0.0586767 12.8799C0.153285 12.9745 0.31959 12.9412 0.6522 12.8747L2.57647 12.4899L2.57648 12.4899C3.16592 12.372 3.46065 12.313 3.72175 12.1733C3.98284 12.0336 4.19537 11.821 4.62043 11.396L9.55795 6.45845C8.31503 5.67093 7.26083 4.62382 6.46596 3.39479Z"
                    fill="#CCD2E3"
                  />
                </svg>
              </button>
              <button class="delete-button" @click="deleteUser(user.id)">
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 3.5H0V6C0.920475 6 1.66667 6.74619 1.66667 7.66667V10.1667C1.66667 12.8333 1.66667 14.1666 2.45483 15.0268C2.5138 15.0911 2.57555 15.1529 2.6399 15.2118C3.50003 16 4.83335 16 7.5 16C10.1666 16 11.5 16 12.3601 15.2118C12.4245 15.1529 12.4862 15.0911 12.5452 15.0268C13.3333 14.1666 13.3333 12.8333 13.3333 10.1667V7.66667C13.3333 6.74619 14.0795 6 15 6V3.5ZM6.41667 7.66667C6.41667 7.11438 5.96895 6.66667 5.41667 6.66667C4.86438 6.66667 4.41667 7.11438 4.41667 7.66667V11.8333C4.41667 12.3856 4.86438 12.8333 5.41667 12.8333C5.96895 12.8333 6.41667 12.3856 6.41667 11.8333V7.66667ZM10.5833 7.66667C10.5833 7.11438 10.1356 6.66667 9.58333 6.66667C9.03105 6.66667 8.58333 7.11438 8.58333 7.66667V11.8333C8.58333 12.3856 9.03105 12.8333 9.58333 12.8333C10.1356 12.8333 10.5833 12.3856 10.5833 11.8333V7.66667Z"
                    fill="#CCD2E3"
                  />
                  <path
                    d="M5.89008 1.30883C5.98504 1.22023 6.19428 1.14194 6.48536 1.0861C6.77643 1.03027 7.13307 1 7.49996 1C7.86685 1 8.22349 1.03027 8.51456 1.0861C8.80564 1.14194 9.01488 1.22023 9.10984 1.30883"
                    stroke="#CCD2E3"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Modal -->
    <UserModal v-if="isModalOpen" :user="selectedUser" @close="closeModal" />
  </div>
</template>

<style scoped>
.user-list-container {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.user-list-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.create-button {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.create-button svg {
  display: block;
}

.user-list {
  overflow-x: auto;
  flex: 1;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th {
  text-align: left;
  padding: 12px 16px;
  font-weight: 500;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 8px;
}

.edit-button,
.delete-button {
  background: transparent;
  border: none;
  padding: 5px;
  border-radius: var(--border-radius);
  display: flex;
}

.loading,
.error,
.empty-state {
  padding: 2rem;
  text-align: center;
}

.error {
  color: var(--color-error);
}

/* Medium screens */
@media (max-width: 992px) {
  table {
    min-width: 100%;
  }

  td {
    white-space: normal;
    word-break: break-word;
  }

  th,
  td {
    padding: 12px 10px;
  }
}

/* Mobile screens */
@media (max-width: 768px) {
  .user-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .create-button {
    width: 100%;
    justify-content: center;
  }

  th,
  td {
    padding: 10px;
    font-size: 0.875rem;
  }

  .user-list-container {
    border-radius: 0;
    box-shadow: none;
  }

  .user-list {
    overflow-x: visible;
  }

  table {
    min-width: unset;
  }

  /* Mobile card layout */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    background: white;
    box-shadow: var(--shadow-sm);
  }

  td {
    border: none;
    border-bottom: 1px solid var(--color-border);
    position: relative;
    padding-left: 50%;
    text-align: right;
    white-space: normal;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  td:last-child {
    border-bottom: none;
  }

  td:before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    width: 45%;
    padding-right: 10px;
    font-weight: 600;
    text-align: left;
  }

  .actions {
    justify-content: flex-end;
    padding-right: 10px;
  }

  /* Extra small screens */
  @media (max-width: 480px) {
    td {
      padding-left: 40%;
    }

    td:before {
      width: 35%;
    }
  }
}
</style>
