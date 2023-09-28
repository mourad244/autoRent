import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ICar } from "../types/car.type";

type TableProps = {
  tableHeaders: JSX.Element[];
  tableRows: JSX.Element[];
  itemActions: JSX.Element;
  title: string;
  subtitle: string;
  tableControlPanel?: JSX.Element;
  searchComponent?: JSX.Element;
  collapseComponent?: JSX.Element;
  collapseButton?: JSX.Element;
  footerComponent?: JSX.Element;
  additionalActions?: JSX.Element;
};

function Table({
  tableHeaders,
  tableRows,
  title,
  subtitle,
  searchComponent,
  collapseComponent,
  collapseButton,
  footerComponent,
  additionalActions,
  tableControlPanel,
  itemActions,
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
        <div className="flex ">{tableControlPanel}</div>
        {itemActions}
      </CardHeader>

      {tableRows.length !== 0 ? (
        <>
          <CardBody
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            className="p-2 px-4"
          >
            <table className=" w-full min-w-max table-auto text-left">
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
