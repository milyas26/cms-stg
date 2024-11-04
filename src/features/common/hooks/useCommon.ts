import { useRef } from "react";
import {
  GetAgeRestriction,
  GetCategory,
  GetCopyright,
  GetGenresFiction,
  GetGenresNonFiction,
} from "../application/common";
import { CommonApiRepository } from "../domain/repositories/CommonApiRepository";
import { useCommonStore } from "@/stores/commonStore";

const commonRepository = new CommonApiRepository();
const getCategory = new GetCategory(commonRepository);
const getCopyright = new GetCopyright(commonRepository);
const getAgeRestriction = new GetAgeRestriction(commonRepository);
const getGenresFiction = new GetGenresFiction(commonRepository);
const getGenresNonFiction = new GetGenresNonFiction(commonRepository);

export const useCommon = () => {
  const {
    setAgeRestrictions,
    setCategories,
    setCopyrights,
    setGenresFiction,
    setGenresNonFiction,
    copyrights,
    ageRestrictions,
    categories,
    genresFiction,
    genresNonFiction,
  } = useCommonStore();

  const initialFetch = useRef({
    category: false,
    copyright: false,
    ageRestriction: false,
    genresFiction: false,
    genresNonFiction: false,
  });

  const fetchCategory = async () => {
    if (!initialFetch.current.category) {
      initialFetch.current.category = true;
      if (categories.length < 1) {
        const response = await getCategory.run();
        setCategories(response);
      }
    }
  };

  const fetchCopyright = async () => {
    if (!initialFetch.current.copyright) {
      initialFetch.current.copyright = true;
      if (copyrights.length < 1) {
        const response = await getCopyright.run();
        setCopyrights(response);
      }
    }
  };

  const fetchAgeRestriction = async () => {
    if (!initialFetch.current.ageRestriction) {
      initialFetch.current.ageRestriction = true;
      if (ageRestrictions.length < 1) {
        const response = await getAgeRestriction.run();
        setAgeRestrictions(response);
      }
    }
  };

  const fetchGenresFiction = async () => {
    if (!initialFetch.current.genresFiction) {
      initialFetch.current.genresFiction = true;
      if (genresFiction.length < 1) {
        const response = await getGenresFiction.run();
        setGenresFiction(response);
      }
    }
  };

  const fetchGenresNonFiction = async () => {
    if (!initialFetch.current.genresNonFiction) {
      initialFetch.current.genresNonFiction = true;
      if (genresNonFiction.length < 1) {
        const response = await getGenresNonFiction.run();
        setGenresNonFiction(response);
      }
    }
  };

  const copyrightLabel = (code: string) => {
    const data = copyrights.find((item) => item.code === code);
    if (!data) return "";
    return data?.langId;
  };

  const ageRestrictionLabel = (code: string) => {
    const data = ageRestrictions.find((item) => item.code === code);
    if (!data) return "";
    return data?.langId;
  };

  return {
    categories,
    fetchCategory,
    copyrights,
    fetchCopyright,
    ageRestrictions,
    fetchAgeRestriction,
    genresFiction,
    fetchGenresFiction,
    genresNonFiction,
    fetchGenresNonFiction,
    copyrightLabel,
    ageRestrictionLabel,
    initialFetch,
  };
};
