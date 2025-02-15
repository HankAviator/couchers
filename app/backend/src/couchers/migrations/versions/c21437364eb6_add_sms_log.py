"""Add SMS log

Revision ID: c21437364eb6
Revises: a6c8b3a9a986
Create Date: 2022-01-15 20:33:25.586641

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "c21437364eb6"
down_revision = "a6c8b3a9a986"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "smss",
        sa.Column("id", sa.BigInteger(), nullable=False),
        sa.Column("time", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("message_id", sa.String(), nullable=False),
        sa.Column("sms_sender_id", sa.String(), nullable=False),
        sa.Column("number", sa.String(), nullable=False),
        sa.Column("message", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_smss")),
    )


def downgrade():
    op.drop_table("smss")
