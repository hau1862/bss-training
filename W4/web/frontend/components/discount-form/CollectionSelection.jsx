import { Autocomplete, Tag, Stack } from "@shopify/polaris";
import { useState, useContext, useCallback, useEffect } from "react";
import { DiscountContext } from "../../Discount";

export default function CollectionSelection(props) {
  const { collections, collectionIds, setCollectionIds } =
    useContext(DiscountContext);
  const deselectedOptions = collections.map((collection) => {
    return {
      label: collection.title.toCapitalize(),
      value: collection.id,
    };
  });
  const paginationInterval = 5;
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] =
    useState(paginationInterval);

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
      const options = [...collectionIds];
      options.splice(options.indexOf(tag), 1);
      setCollectionIds(options);
    },
    [collectionIds]
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
    },
    [deselectedOptions]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Collections"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
    />
  );

  const optionList = options.slice(0, visibleOptionIndex);

  const selectedTagMarkup =
    collectionIds.length > 0 ? (
      <Stack spacing="extraTight">
        {collectionIds.map((option) => {
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
        selected={collectionIds}
        textField={textField}
        onSelect={setCollectionIds}
        listTitle="Suggested Tags"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
      />
    </Stack>
  );
}
