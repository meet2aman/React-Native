import { getAllPosts } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

interface PostData {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
}

const useAppwrite = (fn: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const reponse = await fn();
      setData(reponse);
    } catch (error: any) {
      Alert.alert("Error fetching data", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
