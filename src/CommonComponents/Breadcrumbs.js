import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom"

const Breadcrumbs = () => {
  const breadcrumbs = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Administrator",
      link: "/administrator",
    },
    {
      label: "Logger Search",
      link: "/logger-search",
    },
  ]

  return (
    <div className="breadcrumbs-wrapper">
      {breadcrumbs.map((d, index) => {
        return (
          <React.Fragment key={d.link + index}>
            <Link
              to={d.link}
              className={
                breadcrumbs.length === index + 1 ? "text-gray" : "text-blue"
              }
            >
              {d.label}
            </Link>
            {breadcrumbs.length !== index + 1 && (
              <span className="breadcrumbs">{">"}</span>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
