import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

const useRefetchQuery = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (queryKey: InvalidateQueryFilters) => {
    queryClient.invalidateQueries(queryKey);
  };

  return { refetchQuery };
};

export default useRefetchQuery;
