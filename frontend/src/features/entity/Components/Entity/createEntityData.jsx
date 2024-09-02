function createEntityData(
  useInventoryQuery,
  maybeUseWishlistQuery,
  DataTable,
  inventoryQueryName,
  wishlistQueryName
) {
  const noopHook = () => ({
    data: { entities: {} },
    isLoading: false,
    isError: false,
  });

  const useWishlistQuery = maybeUseWishlistQuery || noopHook;

  return function EntityData({ itemId, onEdit, index, isWishlist }) {
    const { item: inventoryItem } = useInventoryQuery(inventoryQueryName, {
      selectFromResult: ({ data }) => ({
        item: data?.entities[itemId],
      }),
    });

    const { item: wishlistItem } = useWishlistQuery(wishlistQueryName, {
      selectFromResult: ({ data }) => ({
        item: data?.entities[itemId],
      }),

      skip: !isWishlist || !wishlistQueryName,
    });

    const item = isWishlist && wishlistItem ? wishlistItem : inventoryItem;

    if (!item) return null;

    return <DataTable item={item} onEdit={onEdit} index={index} />;
  };
}

export default createEntityData;
