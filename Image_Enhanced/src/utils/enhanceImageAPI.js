import axios from 'axios';

const API_KEY = 'wxz2o1i1gu3kv50e0'
const BASE_URL = 'https://techhk.aoscdn.com/'
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async(file) => {
    //code to call api and get enhanced image
    try{
        const taskId = await uploadImage(file);
        console.log("Image Uploaded Successfully, Task ID:", taskId);

        const enhancedImageData = await PollForEnhancedImage(taskId);
        console.log("Enhanced Image Data:", enhancedImageData)

        return enhancedImageData;

    } catch (error){
        console.log("Error enhancing image:", error.message);
    }
}

const uploadImage = async (file) => {
    //code to upload image
    // "/api/tasks/visual/scale" ---post
    const formData = new FormData();
    formData.append("image_file",file);

    const { data } = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale`,
        formData, 
        {

            headers: {
                "Content-Type" : "multipart/form-data",
                "X-API-KEY" : API_KEY,
            },
        }
    );

    if (!data?.data?.task_id){
        throw new Error("Failed to upload image! Task ID not found.");
    }

    return data.data.task_id;
};

const PollForEnhancedImage = async (taskId, retries=0) =>{
    const result = await fetchEnhancedImage(taskId);

    if(result.state === 4){
        console.log(`Processing.....(${retries}/${MAXIMUM_RETRIES})`);

        if(retries >= MAXIMUM_RETRIES){
            throw new Error("Max retries reached. Please try again later.");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PollForEnhancedImage(taskId,retries+1);
    }
    console.log("Enhanced Image URL:". result);
    return result;
}

const fetchEnhancedImage = async (taskId) => {
    //fetch enhanced image
    // "/api/tasks/visual/scale/{task_id}" ---get
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );
    
    return data.data;

};
