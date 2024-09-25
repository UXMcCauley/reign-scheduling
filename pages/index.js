import Calendar from "@/components/Calendar";

export default function Home({employees, teams, projects, positions, sums}) {
  return (
      <div className="container mx-auto">
        <Calendar employees={employees} projects={projects} positions={positions} teams={teams} sums={sums} />
      </div>
  );
}

export async function getServerSideProps(context) {
    const {req} = context;

    // set up dynamic url
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/get-shifts"
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()


    return {
        props: pageDataJson
    }

}
