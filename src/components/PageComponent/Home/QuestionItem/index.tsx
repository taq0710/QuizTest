import Link from "next/link";

export interface ItemProps {
  image: string;
  title: string;
  width?: number;
  id: string;
}

export default function Item({ image, title, width, id }: ItemProps) {
  return (
    <div
      className={`${
        width === 3 ? "w-[32%]" : width === 2 ? "w-[48%]" : "w-[96%]"
      } h-fit rounded-md shadow-xl overflow-hidden my-2 
    hover:cursor-pointer group flex flex-col items-center hover:scale-[1.05] transition-all`}
    >
      <Link href={`/quizs/${id}`}>
        <div className="w-full rounded-t-md overflow-hidden h-fit ">
          <div className="h-[200px] w-full">
            <img
              src={image}
              alt="testquizs item"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-2 text-lg font-semibold text-center">{title}</div>
        </div>
      </Link>
    </div>
  );
}
