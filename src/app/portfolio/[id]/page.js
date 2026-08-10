import { createClient } from "@/utils/supabase/client";

export default async function Portfolio({ params }) {
  const supabase = createClient();
  const { id } = await params;

  const { data: current, error } = await supabase
    .from("portfolio")
    .select(
      `*,
      portfolio_images(
      id,
      image_url,
      description,
      display_order
      )
    `,
    )
    .eq("id", id)
    .order("display_order", {
      referencedTable: "portfolio_images",
      ascending: true,
    })
    .single();

  //이전글 id, title 조회
  const { data: prev } = await supabase
    .from("portfolio")
    .select("id,title")
    .lt("id", id)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  //다음글 id, title 조회
  const { data: next } = await supabase
    .from("portfolio")
    .select("id,title")
    .gt("id", id)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  console.log("prev" + prev);
  console.log("next" + next);

  console.log(current);

  return (
    <div className="portoflio-single">
      <div className="row">
        <div className="col-md-8 decription">
          <div className="contents shadow">
            {/* <img src="images/portfolio_single_img1.jpg" alt="img1"> */}
            <p>{}</p>
          </div>
        </div>

        <div className="col-md-4 portfolio_info">
          <div className="contents shadow">
            <h2>{current?.title ?? "Project Title"}</h2>

            <div>{current?.content ?? ""}</div>

            <p className="link">
              <a href={current?.url ?? ""}>Visit site &rarr;</a>
            </p>

            <hr className="double" />

            <blockquote>
              <p>{current?.review ?? ""}</p>

              <small>- {current?.reviewer ?? ""} -</small>
            </blockquote>

            <p className="nav">
              {prev && (
                <a href={`/portfolio/${prev.id}`} className="secondary-btn">
                  &larr; {prev.title}
                </a>
              )}
              {next && (
                <a href={`/portfolio/${next.id}`} className="secondary-btn">
                  {next.title} &rarr;
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
