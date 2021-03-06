import json

from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm.session import Session

from quetz.db_models import PackageVersion
from quetz.deps import get_db

router = APIRouter()


@router.get(
    "/api/channels/{channel_name}/packages/{package_name}/versions/{version_hash}/run_exports"  # noqa
)
def get_run_exports(
    channel_name,
    package_name,
    version_hash: str = Path(None, regex=r"^[^\-\r\n]*-[^\-\r\n]*$"),
    db: Session = Depends(get_db),
):

    version_id, build_string = version_hash.split("-")

    package_version = (
        db.query(PackageVersion)
        .filter(PackageVersion.channel_name == channel_name)
        .filter(PackageVersion.version == version_id)
        .filter(PackageVersion.build_string == build_string)
        .first()
    )

    if not package_version.runexports:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"run_exports for package {package_name}-{version_hash} not found",
        )
    run_exports = json.loads(package_version.runexports.data)
    return run_exports
