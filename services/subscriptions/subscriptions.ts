import { baseApi } from "../baseApi";
import type {
  Subscriptions,
  CreateSubscriptionRequest,
  UpdateSubcriptionsRequest,
  SubscriptionsListResponse,
} from "./subscription-types";
import type { ApiResponse, ApiDeleteResponse } from "../shared-types";

const BASE = "/subscriptions";

export const subscriptionsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSubscriptions: build.query<SubscriptionsListResponse, void>({
      query: () => ({ url: BASE }),
      providesTags: ["Subscription"],
    }),

    getSubscriptionById: build.query<ApiResponse<Subscriptions>, string>({
      query: (id) => ({ url: `${BASE}/${id}` }),
      providesTags: (_, __, id) => [{ type: "Subscription", id }],
    }),

    createSubscription: build.mutation<ApiResponse<Subscriptions>, CreateSubscriptionRequest>({
      query: (body) => ({ url: BASE, method: "POST", body }),
      invalidatesTags: ["Subscription"],
    }),

    updateSubscription: build.mutation<ApiResponse<Subscriptions>, { id: string; data: UpdateSubcriptionsRequest }>({
      query: ({ id, data }) => ({ url: `${BASE}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_, __, { id }) => [{ type: "Subscription", id }, "Subscription"],
    }),

    deleteSubscription: build.mutation<ApiDeleteResponse, string>({
      query: (id) => ({ url: `${BASE}/${id}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Subscription", id }, "Subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionsApi;
