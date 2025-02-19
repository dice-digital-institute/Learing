import { create } from "zustand";

// Define Zustand store for authentication and logs
interface CourseState {
    courseList: any[];
    setCourseList: (course: any) => void;
};

interface ToastModalState {
  tostModal: { title: string; type: string, isVisible: boolean } | null;
  setTostModal: (title: string, type: string, isVisible: boolean) => void;
  clearTostModal: () => void; // ✅ Function to reset modal state
}

export const useCourseData = create<CourseState>((set) => ({
    courseList: [],
    setCourseList: (data) => {
      set({ courseList: Array.isArray(data) ? data : [] })},
}));

export const useTostModal = create<ToastModalState>((set) => ({
  tostModal: null, // ✅ Default is null

  setTostModal: (title, type, isVisible) => {
    set({ tostModal: { title, type, isVisible } }); // ✅ Correctly updates the state
  },

  clearTostModal: () => {
    set({ tostModal: null }); // ✅ Clears modal state
  },
}));