"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ASSET_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/asset`;

// ฟังก์ชันดึงข้อมูล (GET)
export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axios.get(ASSET_URL);
      console.log("Query All Assets: " + JSON.stringify(data, null, 2));
      return data; // คืนค่าข้อมูลที่ได้จาก API
    },
  });
};

// ฟังก์ชันสร้างข้อมูลใหม่ (POST)
export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAsset) => {
      const { data } = await axios.post(ASSET_URL, newAsset);
      return data;
    },
    onMutate: async (newAsset) => {
      // หยุดการดึงข้อมูลเก่าเพื่อไม่ให้เกิดการชนกัน
      await queryClient.cancelQueries({ queryKey: ["assets"] });

      // เก็บค่า assets เดิมไว้ในกรณีที่เกิดข้อผิดพลาด
      const previousAssets = queryClient.getQueryData(["assets"]);

      // อัปเดตแคชในแบบ Optimistic Update
      queryClient.setQueryData(["assets"], (oldAssets) => [
        ...(oldAssets || []),
        newAsset, // ใช้ newAsset โดยไม่เพิ่ม id
      ]);
      console.log("onMutate for Assets");
      // คืนค่าข้อมูลที่เก็บไว้ในกรณีที่ต้อง rollback
      return { previousAssets };
    },
    onError: (error, context) => {
      console.error("Error creating asset:", error);

      // rollback ค่า assets เป็นค่าก่อนหน้าถ้าเกิดข้อผิดพลาด
      if (context?.previousAssets) {
        queryClient.setQueryData(["assets"], context.previousAssets);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assets"]);
      console.log("onSuccess for Assets");
    },
    onSettled: () => {
      console.log("onSettle for Assets");
    },
  });
};

// ฟังก์ชันอัปเดตข้อมูล (PUT)
export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn สำหรับการอัปเดตข้อมูล
    mutationFn: async ({ id, updatedAsset }) => {
      const { data } = await axios.put(`${ASSET_URL}/${id}`, updatedAsset);
      return data; // คืนค่าข้อมูลใหม่
    },
    // Optimistic Update: อัปเดตข้อมูลในแคชชั่วคราวก่อน
    onMutate: async ({ id, updatedAsset }) => {
      await queryClient.cancelQueries(["assets"]); // หยุดการดึงข้อมูลชั่วคราว

      const previousAssets = queryClient.getQueryData(["assets"]); // เก็บข้อมูลเดิมไว้

      queryClient.setQueryData(["assets"], (oldAssets) =>
        oldAssets?.map((asset) =>
          asset.id === id ? { ...asset, ...updatedAsset } : asset
        )
      );

      return { previousAssets }; // ส่งคืนข้อมูลเดิมสำหรับ rollback กรณีเกิดข้อผิดพลาด
    },
    // Rollback ข้อมูลหากเกิดข้อผิดพลาด
    onError: (error, { id }, context) => {
      console.error("Error updating asset:", error);
      if (context?.previousAssets) {
        queryClient.setQueryData(["assets"], context.previousAssets); // คืนค่าเดิม
      }
    },
    // รีเฟรชข้อมูลหลังจากทำ mutation สำเร็จหรือไม่สำเร็จ
    onSettled: () => {
      queryClient.invalidateQueries(["assets"]); // รีเฟรชข้อมูล
    },
  });
};

// ฟังก์ชันลบข้อมูล (DELETE)
export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn สำหรับการลบข้อมูล
    mutationFn: async (id) => {
      await axios.delete(`${ASSET_URL}/${id}`);
      return id; // คืนค่า id ที่ลบไป
    },

    // Optimistic Update: อัปเดตข้อมูลในแคชชั่วคราวก่อนการลบ
    onMutate: async (id) => {
      // หยุดการดึงข้อมูลชั่วคราวเพื่อไม่ให้ข้อมูลมีการอัปเดตในระหว่างที่ยังไม่ได้ลบ
      await queryClient.cancelQueries(["assets"]);

      const previousAssets = queryClient.getQueryData(["assets"]); // เก็บข้อมูลเดิมไว้

      // อัปเดตแคชล่วงหน้าโดยการลบข้อมูลในแคชทันที
      queryClient.setQueryData(["assets"], (oldAssets) =>
        oldAssets?.filter((asset) => asset.id !== id)
      );

      return { previousAssets }; // คืนค่าข้อมูลเดิมสำหรับ rollback กรณีเกิดข้อผิดพลาด
    },

    // Rollback ข้อมูลหากเกิดข้อผิดพลาด
    onError: (error, id, context) => {
      console.error("Error deleting asset:", error);
      if (context?.previousAssets) {
        queryClient.setQueryData(["assets"], context.previousAssets); // คืนค่าเดิม
      }
    },

    // รีเฟรชข้อมูลหลังจากทำ mutation สำเร็จหรือไม่สำเร็จ
    onSettled: () => {
      queryClient.invalidateQueries(["assets"]); // รีเฟรชข้อมูล
    },
  });
};
