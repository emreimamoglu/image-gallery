import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styles from "./styles.module.scss";
import { TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ImageService from "../../services/Image";
import { ImageType } from "../../types";
import { useImageContext } from "../../contexts/images";
import { debounce } from "../../utils";
import classNames from "classnames";

const options = ["all", "photo", "illustration", "vector"];

const Header = () => {
  const { setImages, setLoading, page } = useImageContext();

  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState<ImageType>("all");

  const fetchImages = async (
    query: string,
    option: ImageType,
    page: number = 1,
    per_page: number = 10
  ) => {
    setLoading(true);
    await ImageService.getInstance()
      .getImages({
        q: query,
        image_type: option,
        page: page,
        per_page: per_page,
      })
      .then((res) => {
        setImages(res.data.hits);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedFetchImages = useCallback(debounce(fetchImages, 400), []);

  useEffect(() => {
    debouncedFetchImages(search, selectedOption, page, 20);
  }, [search, page]);

  return (
    <section id="page-header" className={styles.header}>
      <div className={styles.leftheader}>
        <CameraAltIcon />
        <div className={styles.options}>
          <ul>
            {options.map((option, index) => (
              <li
                key={option}
                className={classNames(styles.option, {
                  [styles.selected]: option === selectedOption,
                })}
                onClick={() => setSelectedOption(options[index] as ImageType)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.search}>
        <TextField
          id="search-bar"
          label="Search Image"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-bar"
        />
      </div>
    </section>
  );
};

export default Header;
