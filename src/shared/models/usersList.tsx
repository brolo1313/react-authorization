export interface IUser {
  _id: string;
  user: string;
  name: string;
  bio: string;
  profilePics: string;
  role: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  links: {
    website: string;
    facebook: string;
    twitter: string;
    github: string;
  };
  posts: string[];
  __v: number;
}
