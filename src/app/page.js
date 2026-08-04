import { createClient } from "@supabase/supabase-js";

export default async function Page() {
  const supabase = await createClient();
  const { data: porject, error } = await supabase.from("portfolio").select();

  console.log(porjects);

  if (error) {
    console.error("연결실패", error);
    return <div>프로젝트 로드 실패</div>;
  }

  return (
    <>
      <h1></h1>
    </>
  );
}
