import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

type TableProps = {
  tableHeaders: JSX.Element[];
  tableRows: JSX.Element[];
  title: string;
  subtitle: string;
  searchComponent: JSX.Element;
  footerComponent?: JSX.Element;
  additionalActions?: JSX.Element;
};

function Table({
  tableHeaders,
  tableRows,
  title,
  subtitle,
  searchComponent,
  footerComponent,
  additionalActions,
}: TableProps) {
  return (
    <Card
      className="h-full w-full"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <CardHeader
        className="rounded-none"
        floated={false}
        shadow={false}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {subtitle}
            </Typography>
          </div>
          {additionalActions}
        </div>
        {searchComponent}
      </CardHeader>

      {tableRows.length !== 0 ? (
        <>
          <CardBody
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className=" px-0"
          >
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <Fragment key={index}>{header}</Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </CardBody>

          {footerComponent && (
            <CardFooter
              // className="flex items-center justify-between border-t border-blue-gray-50 p-4"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              {footerComponent}
            </CardFooter>
          )}
        </>
      ) : (
        <Typography color="gray" className="m-4 font-bold text-center">
          No data found
        </Typography>
      )}
    </Card>
  );
}

export default Table;
