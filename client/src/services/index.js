import { axiosInstance } from "@/api/axiosInstance";

async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

// delete file using video public id :
async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  console.log("delete api data :", data);

  return data;
}

async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(
    `/instructor/course/create`,
    formData
  );

  return data;
}

async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}

export {
  registerService,
  loginService,
  checkAuthService,
  mediaUploadService,
  mediaDeleteService,
  addNewCourseService,
  updateCourseByIdService,
  fetchInstructorCourseListService,
  fetchInstructorCourseDetailsService,
};
