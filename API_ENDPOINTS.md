# API Endpoints Documentation

## Base URL
```
https://webnotics-chatbot.onrender.com
```
*Configurable via environment variable: `VITE_WEBSITE_URL`*

---

## Authentication Endpoints

### 1. Login
- **Endpoint:** `POST /login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "string",
    "account_id": 7,
    "email": "string",
    "name": "string",
    "subscription_type": "paid|free|superadmin"
  }
  ```
- **Used in:** `src/components/auth/SignInForm.tsx`

---

### 2. Create Account / Sign Up
- **Endpoint:** `POST /create-account`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "string",
    "name": "string",
    "password": "string",
    "phone_number": "string",
    "subscription_type": "free|paid",
    "country": "string",
    "state": "string",
    "address_line1": "string",
    "address_line2": "string",
    "city": "string",
    "postal_code": "string",
    "stripe_payment_method_id": "string" // Only for paid plans
  }
  ```
- **Used in:** `src/components/auth/SignUpForm.tsx`

---

## Account Management Endpoints

### 3. Get Current User Profile
- **Endpoint:** `GET /accounts/me`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "id": 7,
    "email": "string",
    "name": "string",
    "phone_number": "string",
    "address_line1": "string",
    "address_line2": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string",
    "subscription_type": "paid|free|superadmin"
  }
  ```
- **Used in:**
  - `src/components/auth/SignInForm.tsx`
  - `src/layout/AppSidebar.tsx`
  - `src/layout/AppHeader.tsx`
  - `src/pages/Profile/Profile.tsx`
  - `src/pages/Upgrade/UpgradePlan.tsx`
  - `src/components/auth/SuperAdminRoute.tsx`

---

### 4. Update User Profile
- **Endpoint:** `PUT /accounts/me`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "string",
    "phone_number": "string",
    "address_line1": "string",
    "address_line2": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  }
  ```
- **Used in:** `src/pages/Profile/Profile.tsx`

---

### 5. Change Password
- **Endpoint:** `PUT /accounts/change-password`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "old_password": "string",
    "new_password": "string"
  }
  ```
- **Used in:** `src/pages/Profile/ChangePassword.tsx`

---

### 6. Upgrade Plan
- **Endpoint:** `POST /accounts/upgrade-plan`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "stripe_payment_method_id": "string",
    "address_line1": "string",
    "address_line2": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "country": "string"
  }
  ```
- **Used in:** `src/pages/Upgrade/UpgradePlan.tsx`

---

### 7. Get All Users (SuperAdmin Only)
- **Endpoint:** `GET /accounts/all`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Array of user objects
- **Used in:** `src/components/admin/AllUsersList.tsx`

---

## Website Management Endpoints

### 8. Get All Websites
- **Endpoint:** `GET /websites`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Array of website objects
  ```json
  [
    {
      "id": 1,
      "user_id": 7,
      "publish_key": "string",
      "website_url": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
  ```
- **Used in:**
  - `src/pages/ManageScript/KnowledgeBaseManagement.tsx`
  - `src/pages/ManageScript/FaqManagement.tsx`
  - `src/pages/ManageScript/CustomizeChatbot.tsx`

---

### 9. Create Website
- **Endpoint:** `POST /websites`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "website_url": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/WebsiteUrlManagement.tsx`

---

### 10. Crawl Website
- **Endpoint:** `GET /crawl-website`
- **Headers:** `Content-Type: application/json`
- **Query Parameters:**
  - `website_url` (required): URL to crawl
  - `max_pages` (optional): Maximum pages to crawl (default: 200)
  - `max_depth` (optional): Maximum crawl depth (default: 5)
- **Response:**
  ```json
  {
    "website_url": "string",
    "total_pages": 150,
    "category_count": 5,
    "categories": [
      {
        "category_name": "string",
        "page_count": 30,
        "enabled": true,
        "pages": [
          {
            "url": "string",
            "title": "string",
            "description": "string",
            "page_count": 1,
            "enabled": true
          }
        ]
      }
    ],
    "message": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/WebsiteUrlManagement.tsx`

---

## FAQ Management Endpoints

### 11. Get FAQs for Website
- **Endpoint:** `GET /websites/{website_id}/faq`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Array of FAQ objects
  ```json
  [
    {
      "id": 1,
      "website_id": 1,
      "question": "string",
      "answer": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
  ```
- **Used in:** `src/pages/ManageScript/FaqManagement.tsx`

---

### 12. Create FAQ
- **Endpoint:** `POST /websites/{website_id}/faq`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/FaqManagement.tsx`

---

### 13. Update FAQ
- **Endpoint:** `PUT /websites/{website_id}/faq/{faq_id}`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/FaqManagement.tsx`

---

### 14. Delete FAQ
- **Endpoint:** `DELETE /websites/{website_id}/faq/{faq_id}`
- **Headers:** `Authorization: Bearer {token}`
- **Used in:** `src/pages/ManageScript/FaqManagement.tsx`

---

## Knowledge Base Management Endpoints

### 15. Get Knowledge Base Items for Website
- **Endpoint:** `GET /websites/{website_id}/knowledge-base`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Array of knowledge base objects
  ```json
  [
    {
      "id": 1,
      "website_id": 1,
      "question": "string",
      "answer": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
  ```
- **Used in:** `src/pages/ManageScript/KnowledgeBaseManagement.tsx`

---

### 16. Create Knowledge Base Item
- **Endpoint:** `POST /websites/{website_id}/knowledge-base`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/KnowledgeBaseManagement.tsx`

---

### 17. Update Knowledge Base Item
- **Endpoint:** `PUT /websites/{website_id}/knowledge-base/{kb_id}`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```
- **Used in:** `src/pages/ManageScript/KnowledgeBaseManagement.tsx`

---

### 18. Delete Knowledge Base Item
- **Endpoint:** `DELETE /websites/{website_id}/knowledge-base/{kb_id}`
- **Headers:** `Authorization: Bearer {token}`
- **Used in:** `src/pages/ManageScript/KnowledgeBaseManagement.tsx`

---

## Chatbot Customization Endpoints

### 19. Get Chatbot Customizations
- **Endpoint:** `GET /customize-chatbot`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Array of customization objects
- **Used in:** `src/pages/ManageScript/CustomizeChatbot.tsx`

---

### 20. Create Chatbot Customization
- **Endpoint:** `POST /customize-chatbot`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "website_url": "string",
    "publish_key": "string",
    // ... other customization fields
  }
  ```
- **Used in:** `src/pages/ManageScript/CustomizeChatbot.tsx`

---

### 21. Update Chatbot Customization
- **Endpoint:** `PUT /customize-chatbot/{customization_id}`
- **Headers:** 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Request Body:** Customization object
- **Used in:** `src/pages/ManageScript/CustomizeChatbot.tsx`

---

### 22. Delete Chatbot Customization
- **Endpoint:** `DELETE /customize-chatbot/{customization_id}`
- **Headers:** `Authorization: Bearer {token}`
- **Used in:** `src/pages/ManageScript/CustomizeChatbot.tsx`

---

## Messages Endpoints (SuperAdmin Only)

### 23. Get All Messages
- **Endpoint:** `GET /messages/all`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `page_size` (optional): Items per page (default: 10)
- **Response:**
  ```json
  {
    "total": 100,
    "page": 1,
    "page_size": 10,
    "total_pages": 10,
    "websites": [
      {
        "website_url": "string",
        "publish_key": "string",
        "ip_addresses": [
          {
            "ip_address": "string",
            "messages": [
              {
                "id": 1,
                "message": "string",
                "response": "string",
                "timestamp": "string"
              }
            ]
          }
        ]
      }
    ]
  }
  ```
- **Used in:** `src/pages/Admin/AllMessages.tsx`

---

## Summary

### Total Endpoints: 23

**By Category:**
- **Authentication:** 2 endpoints
- **Account Management:** 5 endpoints
- **Website Management:** 3 endpoints
- **FAQ Management:** 4 endpoints
- **Knowledge Base Management:** 4 endpoints
- **Chatbot Customization:** 4 endpoints
- **Messages:** 1 endpoint

**By HTTP Method:**
- **GET:** 9 endpoints
- **POST:** 8 endpoints
- **PUT:** 5 endpoints
- **DELETE:** 3 endpoints

**Authentication Required:**
- All endpoints except `/login` and `/create-account` require Bearer token authentication
- `/crawl-website` does not require authentication (public endpoint)



