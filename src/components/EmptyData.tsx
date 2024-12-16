interface UserListProps {
  data: any[];
  isLoading: boolean;
}

const EmptyData: React.FC<UserListProps> = ({data, isLoading}) => {
  return (
    <div className="empty-data">
      {isLoading ? "Processing" : data && data.length === 0 ? "No data" : ""}
    </div>
  );
};

export default EmptyData;
