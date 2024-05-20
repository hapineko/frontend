interface HeadingProps {
  children: React.ReactNode;
}

export default function Heading({children}: HeadingProps){
  return (
    <h1 className="text-2xl p-8 bg-slate-200 font-bold">{children}</h1>
  );
}
