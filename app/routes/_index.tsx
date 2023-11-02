import { type MetaFunction, type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Movie Display" },
    { name: "description", content: "Movie display written in RemixRun." },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  const url = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTdjMmQ4ZTI4NjYyNzI4NzMyMWQ1MjA2ZmJiMWRjMCIsInN1YiI6IjY1NDJlOGZmM2UwMWVhMDExZGNhZWRlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C7kGBMs-geGbS2D9vSSTvZPh_ZXtO3w78vgcJ1WvC4c'
      },
    }
  )

  return json(await url.json());
}

export default function Index() {
  
  const data = useLoaderData();


  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Movies
          </h2>
        </div>
          <div className="grid gap-4 sm: grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {data.results.map((movie: any) => (
                <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                  <Link className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64" to={`movie/${movie.id}/comments`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie" className="absolute inset-0 w-full object-cover object-center transistion ease-in-out duration-200 group-hover:scale-110"/>
                  </Link>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-2 text-lg font-semibold text-zinc-800">
                    <Link to={`movie/${movie.id}/comments`} prefetch="intent" className="transistion duration-100 hover:text-zinc-500 active:text-zinc-600">{movie.title}</Link>
                  </h2>
                  <p className="line-clamp-3 text-zinc-800">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}