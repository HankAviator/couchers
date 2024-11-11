import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { CrossIcon } from "components/Icons";
import LocationAutocomplete from "components/LocationAutocomplete";
import TextField from "components/TextField";
import { useTranslation } from "i18n";
import { GLOBAL, SEARCH } from "i18n/namespaces";
import { LngLat } from "maplibre-gl";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { GeocodeResult } from "utils/hooks";
import makeStyles from "utils/makeStyles";

const useStyles = makeStyles((theme) => ({
  filterDialogButtonDesktop: {
    marginInlineStart: "auto",
  },
  mobileHide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  flexRow: {
    display: "flex",
    width: "100%",
  },
  justifyContent: {
    justifyContent: "space-around",
  },
}));

interface SearchBoxProps {
  searchType: "location" | "keyword";
  setSearchType: Dispatch<"location" | "keyword">;
  locationResult: GeocodeResult;
  setLocationResult: Dispatch<SetStateAction<GeocodeResult>>;
  setQueryName: Dispatch<SetStateAction<string>>;
  queryName: string;
}

export default function SearchBox({
  searchType,
  setSearchType,
  locationResult,
  setLocationResult,
  setQueryName,
  queryName,
}: SearchBoxProps) {
  const { t } = useTranslation([GLOBAL, SEARCH]);
  const classes = useStyles();

  const { control, errors } = useForm({
    mode: "onChange",
  });

  const handleOnChangeAutocomplete = (event: GeocodeResult) => {
    if (event) {
      const { bbox } = event;
      const newLocationResult: GeocodeResult = {
        ...event,
        bbox: [bbox[2], bbox[3], bbox[0], bbox[1]], //sw long, sw lat, ne long, ne lat
      };
      setLocationResult(newLocationResult);
    }
  };

  const handleOnChangeKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryName(event.target.value);
    setLocationResult({
      ...locationResult,
      location: new LngLat(0, 0),
    });
  };

  const handleOnChangeRadioButton = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: "location" | "keyword"
  ) => {
    setSearchType(value);
    setLocationResult({
      ...locationResult,
      name: "",
      simplifiedName: "",
      location: new LngLat(0, 0),
    });
    setQueryName("");
  };

  return (
    <>
      {searchType === "location" ? (
        <LocationAutocomplete
          control={control}
          name="location"
          defaultValue={locationResult}
          label={t("search:form.location_field_label")}
          onChange={handleOnChangeAutocomplete}
          fieldError={errors.location?.message}
          disableRegions
        />
      ) : (
        <TextField
          fullWidth
          id="query"
          value={queryName}
          label={t("search:form.keywords.field_label")}
          variant="standard"
          helperText=" "
          onChange={handleOnChangeKeyword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t(
                    "search:form.keywords.clear_field_action_a11y_label"
                  )}
                  onClick={() => {
                    setQueryName("");
                    setLocationResult({
                      ...locationResult,
                      location: new LngLat(0, 0),
                    });
                  }}
                  size="small"
                >
                  <CrossIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      <div className={classes.flexRow}>
        <FormControl className={classes.flexRow} component="fieldset">
          <RadioGroup
            className={classes.justifyContent}
            row
            onChange={
              (event, value) =>
                handleOnChangeRadioButton(
                  event,
                  value as "location" | "keyword"
                ) // coercion due material-ui has this type as unknown
            }
            value={searchType}
          >
            <FormControlLabel
              value="location"
              control={<Radio />}
              label={
                <Typography variant="body2">
                  {t("search:form.by_location_filter_label")}
                </Typography>
              }
            />
            <FormControlLabel
              value="keyword"
              control={<Radio />}
              label={
                <Typography variant="body2">
                  {t("search:form.by_keyword_filter_label")}
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
}
