import React from "react";
import { SearchApiRepository } from "../domain/repositories/BannerApiRepository";

const searchRepository = new SearchApiRepository();
const useSearch = () => {
  const [loading, setLoading] = React.useState(false);
  const handleSearch = async (keyword: string) => {
    setLoading(true);
    try {
      return searchRepository.getSearch(keyword);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSearch,
  };
};

export default useSearch;
