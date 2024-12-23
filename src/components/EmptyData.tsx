interface UserListProps {
  data: any[];
  isLoading: boolean;
}

const EmptyData: React.FC<UserListProps> = ({ data, isLoading }) => {
  if (isLoading || data?.length > 0) {
    return null;
  }

  return <div className="empty-data">No data</div>;
};

export default EmptyData;
