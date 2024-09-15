import { AuthActionResponse, AuthProvider , CheckResponse } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";
import { User } from "@/graphql/schema.types";

 

export const authCredentials = {
  name: "",
  email: "",
  password: "",
};
 
 
export const authProvider: AuthProvider  = {
  login: async ({ email }) => {
    try {
      
        const { data } = await dataProvider.custom({
            url: API_URL,
            method: "post",
            headers: {},
            meta: {
                variables: { email },
                rawQuery: `
                    mutation Login($email: String!) {
                        login(loginInput: { email: $email }) {
                            accessToken,
                            user {
                                id,
                                name,
                                email,
                                avatarUrl
                            }
                        }
                    }
                `,
            },
        });

        // Store the token and user details in localStorage
        localStorage.setItem("access_token", data.login.accessToken);
        localStorage.setItem("user_name", data.login.user.name); // Save the user's name

        return {
            success: true,
            redirectTo: "/",
        };
    } catch (e) {
        const error = e as Error;

        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Login failed",
                name: "name" in error ? error.name : "Invalid email or password",
            },
        };
    }
},


  logout: async (): Promise<AuthActionResponse> => {
    localStorage.removeItem("access_token");
    return { success: true, redirectTo: "/login" };
  },

  onError: async (error): Promise<AuthActionResponse> => {
    if (error.statusCode === "UNAUTHENTICATED") {
      return { logout: true, ...error };
    }
    return { success: false, error };
  },

  check: async (): Promise<CheckResponse> => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return { authenticated: false, redirectTo: "/login" };
    }

    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        meta: {
          rawQuery: `
            query Me {
              me {
                name
              }
            }
          `,
        },
      });

      return { authenticated: true, redirectTo: "/" };
    } catch (error) {
      console.error("Check Auth Error:", error);
      return { authenticated: false, redirectTo: "/login" };
    }
  },
  forgotPassword: async () => {
    return {
      success: true,
      redirectTo: "/update-password",
    };
  },
  updatePassword: async () => {
    return { 
      success: true,
      redirectTo: "/login", 
    };
  },

  getIdentity: async () => {
    try {
      const { data } = await dataProvider.custom<{ me: User }>({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
                    query Me {
                        me {
                            id,
                            name,
                            email,
                            phone,
                            jobTitle,
                            timezone
                            avatarUrl
                        }
                      }
                `,
        }, 

        
      });

      return data.me;
    } catch (error) {
      return undefined;
    }
  },

  register: async ({ email, password }): Promise<AuthActionResponse> => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { email, password },
          rawQuery: `
            mutation Register($email: String!, $password: String!) {
              register(registerInput: { email: $email, password: $password }) {
                id
                email 
                 
              }
            }
          `,
        },
      });

      // If registration is successful, return success
      if (data?.register) {
        return { success: true, redirectTo: "/login" };
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      return {
        success: false,
        error: {
          name: "RegistrationError",
          message: error instanceof Error ? error.message : "Registration failed",
        },
      };
    }
  },
};

 