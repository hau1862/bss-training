import { Autocomplete, Tag, Stack, TextField } from "@shopify/polaris";
import { useState, useContext, useCallback } from "react";
import { DiscountContext } from "../../Discount";
import { useAuthenticatedFetch } from "../../hooks";

export default function TagSelection(props) {
  const fetch = useAuthenticatedFetch();
  const { tags, tagIds, setTagIds } = useContext(DiscountContext);
  const paginationInterval = 5;
  const deselectedOptions = tags.map((tag) => {
    return {
      label: tag.toCapitalize(),
      value: tag,
    };
  });

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] =
    useState(paginationInterval);
  const [newTag, setNewTag] = useState("");
  const handleLoadMoreResults = useCallback(() => {
    if (willLoadMoreResults) {
      setIsLoading(true);

      setTimeout(() => {
        const nextVisibleOptionIndex = Math.min(
          visibleOptionIndex + paginationInterval,
          options.length
        );

        setIsLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (nextVisibleOptionIndex === options.length) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  }, [willLoadMoreResults, visibleOptionIndex, options.length]);

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...tagIds];
      options.splice(options.indexOf(tag), 1);
      setTagIds(options);
    },
    [tagIds]
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );

      let endIndex = resultOptions.length - 1;
      if (resultOptions.length === 0) {
        endIndex = 0;
      }
      setOptions(resultOptions);
      setInputValue;
    },
    [deselectedOptions]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
    />
  );

  const optionList = options.slice(0, visibleOptionIndex);

  const selectedTagMarkup =
    tagIds.length > 0 ? (
      <Stack spacing="extraTight">
        {tagIds.map((option) => {
          let tagLabel = deselectedOptions.find(
            (item) => item.value == option
          ).label;
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </Stack>
    ) : null;

  return (
    <Stack vertical>
      {selectedTagMarkup}
      <Autocomplete
        allowMultiple
        options={optionList}
        selected={tagIds}
        textField={textField}
        onSelect={setTagIds}
        listTitle="Suggested Tags"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
      />
    </Stack>
  );
}
