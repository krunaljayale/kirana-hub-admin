export const API_BASE_URL = process.env.NEXT_Login_PUBLIC_API_URL || '/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
  },
  DASHBOARD: {
    STATS: `${API_BASE_URL}/dashboard/stats`,
    SALES_CHART: `${API_BASE_URL}/dashboard/sales-chart`,
  },
  ORDERS: {
    GET_ALL: `${API_BASE_URL}/orders`,
    GET_ONE: (id: string | number) => `${API_BASE_URL}/orders/${id}`,
    UPDATE_STATUS: (id: string | number) => `${API_BASE_URL}/orders/${id}/status`,
  },
  INVENTORY: {
    GET_ALL: `${API_BASE_URL}/inventory`,
    ADD: `${API_BASE_URL}/inventory/add`,
    DELETE: (id: string | number) => `${API_BASE_URL}/inventory/${id}`,
  }
};