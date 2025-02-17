"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const VIEW_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/view`; // เปลี่ยน URL

// ฟังก์ชันดึงข้อมูล (GET) **************************
export const useViews = () => {
  return useQuery({
    queryKey: ["views"],
    queryFn: async () => {
      const { data } = await axios.get(VIEW_URL);
      console.log("Query All Views",data);  // Debugging ข้อมูลที่ได้จาก API
      return data; // คืนค่าข้อมูลที่ได้จาก API
    },
  });
};

// ฟังก์ชันสร้างข้อมูลใหม่ (POST) **************************
export const useCreateView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newView) => {
      const { data } = await axios.post(VIEW_URL, newView);
      return data;
    },
    onMutate: async (newView) => {
      await queryClient.cancelQueries(["views"]); // หยุดการดึงข้อมูลเดิมชั่วคราว

      const previousViews = queryClient.getQueryData(["views"]); // เก็บข้อมูลเก่า

      queryClient.setQueryData(["views"], (oldViews) => [
        ...(oldViews || []),
        newView, // Optimistic update
      ]);
      console.log("onMutate for Views");
      return { previousViews }; // คืนค่าเดิมเผื่อ rollback
    },
    onError: (error, context) => {
      console.error("Error creating view:", error);
      if (context?.previousViews) {
        queryClient.setQueryData(["views"], context.previousViews); // คืนค่าเดิม
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["views"]); // รีเฟรชข้อมูล
      console.log("onSuccess for Views");
    },
    onSettled: () => {
      console.log("onSettle for Views");
    },
  });
};

// ฟังก์ชันอัปเดตข้อมูล (PUT) **************************
export const useUpdateView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedView }) => {
      const { data } = await axios.put(`${VIEW_URL}/${id}`, updatedView);
      return data; // คืนค่าข้อมูลที่อัปเดตแล้ว
    },
    onMutate: async ({ id, updatedView }) => {
      await queryClient.cancelQueries(["views"]); // หยุดการดึงข้อมูลเดิม

      const previousViews = queryClient.getQueryData(["views"]); // เก็บข้อมูลเก่า

      queryClient.setQueryData(["views"], (oldViews) =>
        oldViews?.map((view) =>
          view.id === id ? { ...view, ...updatedView } : view
        )
      );
      return { previousViews }; // คืนข้อมูลเดิมสำหรับ rollback
    },
    onError: (error, { id }, context) => {
      console.error("Error updating view:", error);
      if (context?.previousViews) {
        queryClient.setQueryData(["views"], context.previousViews); // คืนค่าเดิม
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["views"]); // รีเฟรชข้อมูล
    },
  });
};

// ฟังก์ชันลบข้อมูล (DELETE) **************************
export const useDeleteView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${VIEW_URL}/${id}`);
      return id; // คืนค่า id ที่ลบไป
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["views"]); // หยุดการดึงข้อมูลเดิมชั่วคราว

      const previousViews = queryClient.getQueryData(["views"]); // เก็บข้อมูลเก่า

      queryClient.setQueryData(["views"], (oldViews) =>
        oldViews?.filter((view) => view.id !== id)
      );
      console.log("onMutate for Delete Views");
      return { previousViews }; // คืนข้อมูลเดิมสำหรับ rollback
    },
    onError: (error, id, context) => {
      console.error("Error deleting view:", error);
      if (context?.previousViews) {
        queryClient.setQueryData(["views"], context.previousViews); // คืนค่าเดิม
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["views"]); // รีเฟรชข้อมูล
      console.log("onSettled for Delete Views");
    },
  });
};
